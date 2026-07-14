from django.urls import path
from .views import (
    categories,
    products,
    product_detail,
    related_products,
    add_to_cart,
    category_products,
    cart,
)

urlpatterns = [
    path(
        "categories/",
        categories,
    ),

    path(
        "products/",
        products,
    ),

    path(
        "products/<int:pk>/",
        product_detail,
    ),

    path(
        "related/<int:category_id>/",
        related_products,
    ),

    path(
        "cart/add/",
        add_to_cart,
    ),

    path(
        "category/<int:id>/",
        category_products,
    ),

    path(
    "cart/",
    cart
),
]

