from rest_framework import serializers
from .models import Post, Comment
from users.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='posts-detail', lookup_field='pk')
    owner = UserSerializer(read_only=True)
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.pop('likes', None)
        post = Post(owner=user, **validated_data)
        post.save()
        return post

    def get_liked(self, obj):
        user = self.context['request'].user
        return user.likes.filter(id=obj.id).exists()


class CommentSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='comments-detail', lookup_field='pk')
    owner = UserSerializer(read_only=True)
    is_mine = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.pop('owner', None)
        comment = Comment(owner=user, **validated_data)
        comment.save()
        return comment

    def get_is_mine(self, obj):
        user = self.context['request'].user
        return obj.owner == user
