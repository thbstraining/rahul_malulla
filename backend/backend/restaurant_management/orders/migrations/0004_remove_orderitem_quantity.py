# Generated by Django 5.0.7 on 2024-07-13 16:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_remove_order_items_orderitem_quantity_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='quantity',
        ),
    ]