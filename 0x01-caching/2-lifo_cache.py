#!/usr/bin/env python3
"""
This module provides the LIFOCache class
"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """
    A caching system that inherits from BaseCaching.

    It uses the Last In, First Out (LIFO) algorithm.

    overloads:
      - put: Adds an item to the cache
      - get: Retrieves an item from the cache
    """
    def __init__(self):
        """
        Initialize the LIFO Cache
        """
        super().__init__()

    def put(self, key, item):
        """
        Adds an item to the cache using the key

        Arguments:
          key (str): The key to the item
          item (str): The item to add
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Discard the last item put in cache (LIFO algorithm)
                last_key = next(reversed(self.cache_data))
                del self.cache_data[last_key]
                print("DISCARD:", last_key)

            self.cache_data[key] = item

    def get(self, key):
        """
        Retrieves an item from the cache

        Arguments:
          key (str): The key to the item

        Returns:
          str: The item from the cache, or None if the key is not found
        """
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        return None
