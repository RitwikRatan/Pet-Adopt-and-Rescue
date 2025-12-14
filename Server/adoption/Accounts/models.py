from django.db import models

class AppUser(models.Model):  
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=150, unique=True)
    password_hash = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'  

    def __str__(self):
        return self.username


class PetReport(models.Model):
    user = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
        related_name='pet_reports'
    )
    pet_name = models.CharField(max_length=100)
    pet_type = models.CharField(max_length=50)
    image_path = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255)
    description = models.TextField()
    contact_number = models.CharField(max_length=20)
    status = models.CharField(max_length=20, default='Lost')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'pet_reports'

    def __str__(self):
        return f"{self.pet_name} ({self.status})"


class PetImage(models.Model):
    report = models.ForeignKey(
        PetReport,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image_path = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'pet_images'

    def __str__(self):
        return self.image_path
