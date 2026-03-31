package admin

import (
	"eksporin/models"
	// "eksporin/modules/utils"
	"errors"
	"github.com/google/uuid"
)

func AcceptVerified(userID uuid.UUID, approve bool) (*models.User, error) {
	user, err := FindByID(userID)

	if err != nil {
		return nil, err
	}

	if user.IsVerified != models.Pending {
		return nil, errors.New("User Already verify")
	}

	if approve {
		user.IsVerified = models.Verified
		user.Role = models.RoleAgregator
	} else {
		user.IsVerified = models.Rejected
	}

	err = UpdateUser(user)

	if err != nil {
		return nil, err
	}

	return user, nil
}