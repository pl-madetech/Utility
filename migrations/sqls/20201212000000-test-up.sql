USE nhs_virtual_visit_dev

INSERT INTO dbo.[user] ([email], [password], [type], [status]) 
	VALUES('nhs-admin-1@nhs.co.uk', '$2b$10$Kwzuu07E.lx6ezpK58RYGuBZtrd9ULd5PsCPJXbe3BlN7Sax.rrmS', 'admin', 1);