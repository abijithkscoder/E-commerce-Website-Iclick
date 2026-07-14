from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Category, Product, Cart
from .serializers import CategorySerializer, ProductSerializer, CartSerializer


@api_view(['GET'])
def categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, pk):
    product = get_object_or_404(Product, id=pk)   # returns 404 instead of 500
    serializer = ProductSerializer(product, context={"request": request})
    return Response(serializer.data)


@api_view(['GET'])
def related_products(request, category_id):
    products = Product.objects.filter(category_id=category_id).exclude()[:4]
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get("product_id")

    if not product_id:
        return Response(
            {"error": "product_id is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    product = get_object_or_404(Product, id=product_id)  # 404 if product doesn't exist

    cart_item, created = Cart.objects.get_or_create(
        user=request.user,
        product=product
    )

    if not created:
        cart_item.quantity += 1
        cart_item.save()

    serializer = CartSerializer(cart_item)
    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
    )


@api_view(["GET"])
def category_products(request, id):
    products = Product.objects.filter(category=id)
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def cart(request):

    items = Cart.objects.filter(user=request.user)

    serializer = CartSerializer(
        items,
        many=True,
        context={"request":request}
    )

    return Response(serializer.data)

