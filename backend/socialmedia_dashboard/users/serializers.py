from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='users-detail', lookup_field='pk')
    password = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["url", "first_name", "last_name", "email", "phone", "is_active",
                  "picture", "password", "password2", "full_name"]

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Passwords must match")
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if password is None:
            raise serializers.ValidationError({"password": ["Password is required"]})
        try:
            validated_data.pop('password2')
        except KeyError:
            raise serializers.ValidationError([{"password2": ["Enter password confirmation"]}])
        user = User.objects.create(**validated_data)
        user.is_active = True
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        super(UserSerializer, self).update(instance, validated_data)
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
            instance.save()
        return instance

    def get_full_name(self, obj):
        return obj.get_full_name()


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_new_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        new_password = attrs.get('new_password')
        confirm_new_password = attrs.get('confirm_new_password')

        if new_password != confirm_new_password:
            raise serializers.ValidationError({"confirm_new_password": "Passwords do not match."})

        return attrs

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value
