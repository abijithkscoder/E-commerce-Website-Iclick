
from rest_framework import serializers
from .models import Product, Category, Cart, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "image"]


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"


# ---------- Product Images ----------
class ProductImageSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ["id", "image"]

    def get_image(self, obj):
        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url


# ---------- Products ----------
class ProductSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "category",
            "name",
            "description",
            "price",
            "stock",
            "image",
            "images",
            "created_at",
        ]

    def get_image(self, obj):
        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url

    def get_images(self, obj):
        request = self.context.get("request")

        images = ProductImage.objects.filter(product=obj)

        return ProductImageSerializer(
            images,
            many=True,
            context={"request": request},
        ).data

class CartSerializer(serializers.ModelSerializer):

    product = ProductSerializer(
        read_only=True
    )

    class Meta:
        model = Cart
        fields = "__all__"