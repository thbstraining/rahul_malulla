# restaurants/views.py

from rest_framework import viewsets
from .models import Restaurant, MenuItem
from .serializers import RestaurantSerializer, MenuItemSerializer

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    basename = 'menu-item'

    def get_queryset(self):
        restaurant_id = self.request.query_params.get('restaurant')
        return MenuItem.objects.filter(restaurant_id=restaurant_id)
