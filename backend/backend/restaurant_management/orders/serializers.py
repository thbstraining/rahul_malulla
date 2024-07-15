from rest_framework import serializers
from .models import Order, OrderItem
from restaurants.models import MenuItem

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ('id', 'name', 'description', 'price', 'restaurant')

class OrderItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer()

    class Meta:
        model = OrderItem
        fields = ('id', 'menu_item')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ('id', 'items', 'customer_name', 'customer_address', 'customer_phone', 'status', 'restaurant')

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            menu_item_data = item_data['menu_item']

            # Assuming menu_item_data contains necessary fields for MenuItem creation
            menu_item, created = MenuItem.objects.get_or_create(**menu_item_data)

            OrderItem.objects.create(order=order, menu_item=menu_item)

        return order

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items')

        instance.customer_name = validated_data.get('customer_name', instance.customer_name)
        instance.customer_address = validated_data.get('customer_address', instance.customer_address)
        instance.customer_phone = validated_data.get('customer_phone', instance.customer_phone)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        # Clear existing items
        instance.items.all().delete()

        for item_data in items_data:
            menu_item_data = item_data['menu_item']

            # Assuming menu_item_data contains necessary fields for MenuItem creation
            menu_item, created = MenuItem.objects.get_or_create(**menu_item_data)

            OrderItem.objects.create(order=instance, menu_item=menu_item)

        return instance