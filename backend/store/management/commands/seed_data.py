"""Populate the database with demo categories and products.

The command is idempotent: running it multiple times updates existing rows
instead of creating duplicates. Image fields point at files that already ship
in the ``media/`` directory, so a fresh deployment has a fully populated store.
"""

from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction

from store.models import Category, Product, ProductImage


# Category ids are fixed so they match the static category cards used by the
# frontend (see frontend/src/components/Categories.jsx).
CATEGORIES = [
    (1, "Electronics", "categories/electronics.jpg"),
    (2, "Fashion", "categories/fashion.jpg"),
    (3, "Home & Living", "categories/home-living.jpg"),
    (4, "Beauty", "categories/beauty.jpg"),
    (5, "Footwear", "categories/footwear.jpg"),
]

PRODUCTS = [
    # (category_id, name, description, price, stock, image, [gallery images])
    (
        1,
        "Apple iPhone 15",
        "6.1-inch Super Retina XDR display, A16 Bionic chip and a 48MP main camera.",
        Decimal("79999.00"),
        25,
        "products/iphone15.jpg",
        [
            "products/gallery/iphone15.jpg",
            "products/gallery/Apple-iPhone-15-Pro-lineup-design-230912_big.jpg.large.jpg",
        ],
    ),
    (
        1,
        "Sony WH-1000XM5",
        "Industry-leading noise cancelling wireless headphones with 30h battery life.",
        Decimal("29999.00"),
        40,
        "products/sony.jpg",
        [],
    ),
    (
        1,
        "MacBook Pro",
        "Apple M-series MacBook Pro with a stunning Liquid Retina XDR display.",
        Decimal("199999.00"),
        15,
        "products/macbookpro.jpeg",
        [],
    ),
    (
        2,
        "Women's Summer Dress",
        "Lightweight floral summer dress, perfect for warm days.",
        Decimal("1499.00"),
        60,
        "products/women.jpeg",
        [],
    ),
    (
        2,
        "Oversized T-Shirt",
        "Comfortable 100% cotton oversized t-shirt with a relaxed fit.",
        Decimal("799.00"),
        120,
        "products/oversized.jpeg",
        [],
    ),
    (
        3,
        "Queen Size Bed",
        "Solid wood queen size bed frame with an upholstered headboard.",
        Decimal("24999.00"),
        10,
        "products/Queen_Size_Bed.jpeg",
        [],
    ),
    (
        3,
        "Table Lamp",
        "Modern bedside table lamp with a warm ambient glow.",
        Decimal("1299.00"),
        75,
        "products/lamp.jpeg",
        [],
    ),
    (
        3,
        "Dinner Plate Set",
        "Set of six premium ceramic dinner plates.",
        Decimal("1999.00"),
        50,
        "products/plate.jpeg",
        [],
    ),
    (
        4,
        "Matte Lipstick",
        "Long-lasting matte finish lipstick in a rich shade.",
        Decimal("499.00"),
        200,
        "products/lipstick.jpeg",
        [],
    ),
    (
        4,
        "Sunscreen SPF 50",
        "Broad-spectrum SPF 50 sunscreen for everyday protection.",
        Decimal("599.00"),
        150,
        "products/sunscreen.jpeg",
        [],
    ),
    (
        4,
        "Body Spray",
        "Refreshing long-lasting body spray with a fresh fragrance.",
        Decimal("349.00"),
        180,
        "products/spray.jpeg",
        [],
    ),
    (
        5,
        "White Sneakers",
        "Classic white sneakers that go with every outfit.",
        Decimal("2499.00"),
        90,
        "products/whiteshoe.jpeg",
        [],
    ),
    (
        5,
        "Formal Shoes",
        "Genuine leather formal shoes for a sharp, professional look.",
        Decimal("3499.00"),
        45,
        "products/formalshoe.jpeg",
        ["products/gallery/formalshoe.jpeg"],
    ),
    (
        5,
        "Women's Heels",
        "Elegant block heels designed for all-day comfort.",
        Decimal("2799.00"),
        55,
        "products/womenshoe.jpeg",
        [],
    ),
]


class Command(BaseCommand):
    help = "Seed the database with demo categories and products (idempotent)."

    @transaction.atomic
    def handle(self, *args, **options):
        for pk, name, image in CATEGORIES:
            Category.objects.update_or_create(
                pk=pk,
                defaults={"name": name, "image": image},
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(CATEGORIES)} categories."))

        for category_id, name, description, price, stock, image, gallery in PRODUCTS:
            product, _ = Product.objects.update_or_create(
                name=name,
                defaults={
                    "category_id": category_id,
                    "description": description,
                    "price": price,
                    "stock": stock,
                    "image": image,
                },
            )

            product.images.all().delete()
            for gallery_image in gallery:
                ProductImage.objects.create(product=product, image=gallery_image)

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(PRODUCTS)} products."))
