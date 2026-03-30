package users

import (
	"eksporin/models"
	"eksporin/modules/utils"
	"errors"
	"github.com/google/uuid"
)

func RegisterUser(email string, password string)(*models.User, error) {

	if email == "" || password == "" {
		return nil, errors.New("Email & Password Required")
	}

	hashedPassword, err := utils.HashPassword(password)

	if err != nil {
		return nil, err
	}
	
	user := &models.User{
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

	token, err := utils.GenerateToken(user.ID, user.Email)

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

	user.Name = name

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