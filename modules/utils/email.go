package utils

import (
	// "fmt"
	"net/smtp"
	"os"
)

func SendMail(to string, subject string, body string) error {
	smtpHost :=	os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	sender := os.Getenv("SMTP_EMAIL")
	password := os.Getenv("SMTP_PASS")

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
