#!/usr/bin/env python3
"""
This module provides functions and classes that
implement a simple pagination.
"""
import csv
import math
from typing import List
from typing import Tuple


class Server:
    """
    Server class to paginate a database of popular baby names.

    Attributes:
        DATA_FILE (str): The path to the CSV file containing the dataset.

    Methods:
        __init__(self): Initializes the Server instance.
        dataset(self) -> List[str]: Retrieves the dataset (or cached data).
        get_page(self, page: int = 1, page_size: int = 10) -> List[str]:
            Retrieves the requested page of the dataset.
    """
    DATA_FILE = 'data/Popular_Baby_Names.csv'

    def __init__(self):
        """
        Initializes the Server instance.
        """
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Retrieves the dataset (or cached data).

        Returns:
            List[List]: A list of lists representing the dataset.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE, 'r') as file:
                reader = csv.reader(file)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieves the requested page of the dataset.

        Arguments:
            page (int): The page number.
            page_size (int): The number of items per page.

        Returns:
            List[List]: A list of lists representing the dataset.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        dataset = self.dataset()
        start, end = index_range(page, page_size)
        return dataset[start:end]


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Returns a tuple containing the start and end indexes for the range of
    indexes to return in a list for those particular pagination parameters.

    Arguments:
        page (int): The page number.
        page_size (int): The number of items per page.

    Returns:
        Tuple[int, int]: A tuple containing the start and end indexes.
    """
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)
