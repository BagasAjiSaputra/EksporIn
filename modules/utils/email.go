package utils

import (
	// "fmt"
	"net/smtp"
)

func SendMail(to string, subject string, body string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	sender := "bagasaji932@gmail.com"
	password := "drro pseu ukpo pbot"

	// msg := []byte(fmt.Sprintf("Subject: %s\r\n\r\n%s", subject, body))
		message := []byte(
		"From: " + sender + "\r\n" +
			"To: " + to + "\r\n" +
			"Subject: " + subject + "\r\n" +
			"MIME-Version: 1.0\r\n" +
			"Content-Type: text/html; charset=\"UTF-8\"\r\n\r\n" +
			body,
	)

	auth := smtp.PlainAuth("", sender, password, smtpHost)

    err := smtp.SendMail(smtpHost+":"+smtpPort, auth, sender, []string{to}, message)
    if err != nil {
        return err
    }

    return nil
}
