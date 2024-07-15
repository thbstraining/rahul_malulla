# Generated by Django 5.0.7 on 2024-07-13 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='items',
            field=models.ManyToManyField(related_name='menu_items', to='restaurants.menuitem'),
        ),
    ]
