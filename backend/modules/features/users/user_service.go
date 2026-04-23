package users

import (
	"eksporin/models"
	"eksporin/modules/utils"
	"errors"
	"github.com/google/uuid"
	"time"
	"fmt"
)

func RegisterUser(name string, email string, password string)(*models.User, error) {

	if name == "" || email == "" || password == "" {
		return nil, errors.New("All Field Required")
	}

	hashedPassword, err := utils.HashPassword(password)

	if err != nil {
		return nil, err
	}
	
	user := &models.User{
		Name: name,
		Email : email,
		Password : hashedPassword,
	}

	err = CreateUser(user)

	if err != nil {
		return nil, errors.New("User Already Exist")
	}

	return user, nil
}

func LoginUser(email string, password string) (string, error) {
	user := FindByEmail(email) 

	if user == nil {
		return "", errors.New("Invalid Credentials")
	}

	if !utils.CheckPassword(user.Password, password) {
		return "", errors.New("Invalid Credentials")
	}

	token, err := utils.GenerateToken(user.ID, user.Email, string(user.Role))

	if err != nil {
		return "", err
	}

	return token, nil
}

func GetUserByID(id uuid.UUID) (*models.User, error) {
	return FindByID(id)
}

func UpdateUserByID(id uuid.UUID, name string, email string, password string) (*models.User, error) {

	user, err := FindByID(id)

	if err != nil {
		return nil, err
	}

	if name != "" {
		user.Name = name
	}
	if email != "" {
		user.Email = email
	}

	if password != "" {
		hashedPassword, err := utils.HashPassword(password)

		if err != nil {
			return nil, err
		}

		user.Password = hashedPassword
	}

	err = UpdateUser(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func RequestVerified(id uuid.UUID ) (*models.User, error) {

	user, err := FindByID(id)

	if err != nil {
		return nil, err
	}

	user.IsVerified = "pending"

	err = UpdateUser(user)

	return user, nil
}

func RequestResetPassword(email string) (string, error) {
	user := FindByEmail(email)

	if user == nil {
		return "", nil
	}

	token := uuid.New().String()
	expire := time.Now().Add(1 * time.Hour)

	user.ResetToken = &token
	user.ResetExp = &expire

	err := UpdateUser(user)

	if err != nil {
		return "", nil
	}


	resetLink := fmt.Sprintf("http://localhost:8080/reset-password?token=%s", token)

	subject := "Reset Password"
	body := fmt.Sprintf(`
	<!DOCTYPE html>
	<html>
	  <head>
	  <meta charset="UTF-8" />
	  <title>Reset Password</title>
	 </head>
	 <body style="background-color:#f3f4f6; font-family:Arial, sans-serif; margin:0; padding:0;">
	   <table width="100%%" cellpadding="0" cellspacing="0">
	     <tr>
	       <td align="center">
	         <table width="600" cellpadding="0" cellspacing="0" style="background-color:white; margin-top:50px; border-radius:10px; padding:40px; text-align:center;">
	           <tr>
	             <td>
	               <h1 style="color:#7c3aed;">Reset Your Password</h1>
	               <p style="color:#374151; font-size:16px;">Click the button below to reset your password.</p>
	               <a href="%s" style="display:inline-block; margin-top:20px; padding:15px 30px; background-color:#7c3aed; color:white; text-decoration:none; border-radius:8px; font-weight:bold;">Reset Password</a>
	               <p style="color:#9ca3af; font-size:12px; margin-top:20px;">If you didn't request this, just ignore this email.</p>
	             </td>
	           </tr>
	         </table>
	       </td>
	     </tr>
	   </table>
	 </body>
	</html>
	`, resetLink)

	err = utils.SendMail(user.Email, subject, body)
	if err != nil {
		return "", err
	}

	return resetLink, nil
}

func UpdatePassword(token string, newPassword string) (*models.User, error) {
	user := FindByResetToken(token)

	if user == nil {
		return nil, errors.New("Invalid Reset Token")
	}

	if user.ResetExp == nil || user.ResetExp.Before(time.Now()) {
		return nil, errors.New("Token Expired")
	}

	hashedPassword, err := utils.HashPassword(newPassword)

	if err != nil {
		return nil, err
	}

	user.Password = hashedPassword
	user.ResetToken = nil
	user.ResetExp = nil

	err = UpdateUser(user)

	if err != nil {
		return nil, err
	}

	return user, nil
}
