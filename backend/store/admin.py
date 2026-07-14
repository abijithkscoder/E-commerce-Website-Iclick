from django.contrib import admin
from .models import(Category,Product,Wishlist,Cart,ProductImage)

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Wishlist)
admin.site.register(Cart)