#!/usr/bin/env python3
"""
This module provides the BasicCache class
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """
    The BasicCache class that inherits from BaseCaching

    Attributes:
        - cache_data: Holds cache data

    Overloads:
        - put: Adds an item to the cache
        - get: Retrieves an item from the cache
    """
    def put(self, key, item):
        """
        Adds an item to the cache

        Arguments:
            key (str): The key to the item
            item (str): The item to add
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        Retrieves an item from the cache

        Arguments:
            key (str): The key to the item

        Returns:
            str: The item from the cache, or None if the key is not found
        """
        return self.cache_data.get(key)
