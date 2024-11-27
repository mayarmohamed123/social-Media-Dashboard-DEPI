from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status

from .serializers import PostSerializer, Post, CommentSerializer, Comment
from rest_framework.decorators import action, api_view, permission_classes


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Post.objects.all()
        category = self.request.query_params.get('category', None)

        if category == "feed":
            queryset = queryset.exclude(owner=user)
        elif category == "my-posts":
            queryset = queryset.filter(owner=user)
        elif category == "liked":
            queryset = queryset.filter(likes=user)

        return queryset

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = self.request.user
        if post.likes.filter(id=user.id).exists():
            post.likes.remove(user)
        else:
            post.likes.add(user)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all()
        post = self.request.query_params.get('post', None)
        if post:
            post = Post.objects.get(pk=post)
            queryset = queryset.filter(post=post)
        return queryset


@api_view(["GET"])
@permission_classes((permissions.IsAuthenticated,))
def get_post_data(request):
    post_id = request.query_params.get('post', None)
    if post_id:
        try:
            post = Post.objects.get(pk=post_id)
            post_serialized = PostSerializer(post, context={'request': request}).data
            comments = Comment.objects.filter(post=post)
            comments_serialized = CommentSerializer(comments, many=True, context={'request': request}).data
            return Response({"post": post_serialized, "comments": comments_serialized}, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({"detail": "Post isn't available"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"detail": "post-id must be included in query params"}, status=status.HTTP_404_NOT_FOUND)
