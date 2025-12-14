from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from django.db import models
from .models import AppUser


class RegisterSerializer(serializers.ModelSerializer):
    # accept plain `password` from user, but store hashed in `password_hash`
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = AppUser
        fields = ['id', 'username', 'email', 'phone', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = AppUser(**validated_data)
        user.password_hash = make_password(password)  # hash password
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        identifier = data.get('username_or_email')
        password = data.get('password')

        # allow login with username OR email
        try:
            user = AppUser.objects.get(
                models.Q(username=identifier) | models.Q(email=identifier)
            )
        except AppUser.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials.")

        if not check_password(password, user.password_hash):
            raise serializers.ValidationError("Invalid credentials.")

        data['user'] = user
        return data
