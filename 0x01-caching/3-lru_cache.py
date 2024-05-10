#!/usr/bin/env python3
"""
This module provides the LRUCache class
"""
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """
    A caching system that inherits from BaseCaching.

    It uses the Least Recently Used (LRU) algorithm.

    overloads:
      - put: Adds an item to the cache
      - get: Retrieves an item from the cache
    """
    def __init__(self):
        """
        Initialize the LRU Cache
        """
        super().__init__()
        self.access_order = []

    def put(self, key, item):
        """
        Adds an item to the cache using the key

        Arguments:
          key (str): The key to the item
          item (str): The item to add
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Discard the least recently used item in cache (LRU algorithm)
                lru_key = self.access_order.pop(0)
                del self.cache_data[lru_key]
                print("DISCARD:", lru_key)

            self.cache_data[key] = item
            self.access_order.append(key)

    def get(self, key):
        """
        Retrieves an item from the cache

        Arguments:
          key (str): The key to the item

        Returns:
          str: The item from the cache, or None if the key is not found
        """
        if key is not None and key in self.cache_data:
            self.access_order.remove(key)
            self.access_order.append(key)
            return self.cache_data[key]
        return None
