#!/usr/bin/python3
""" This module provides the BaseCaching class
"""


class BaseCaching:
    """ BaseCaching defines:
      - constants of your caching system
      - where methods will be stored (in a dictionary) for child classes

      Attributes:
        - MAX_ITEMS: Represents the maximum number of items in cache
        - cache_data: Holds cache data
    """

    MAX_ITEMS = 4

    def __init__(self):
        """ Initiliaze BaseCaching

        Note:
            If you have to do something in your subclass,
            initiliaze it in the `create_cache` method.
        """
        self.cache_data = {}

    def print_cache(self):
        """ Print the cache data
        """
        print("Current cache:")
        for key in sorted(self.cache_data.keys()):
            print("{}: {}".format(key, self.cache_data.get(key)))

    def put(self, key, item):
        """ Add an item in the cache according to the cache strategy
        """
        raise NotImplementedError("put must be implemented in your cache class")

    def get(self, key):
        """ Get an item by key according to the cache hit
        """
        raise NotImplementedError("get must be implemented in your cache class")
