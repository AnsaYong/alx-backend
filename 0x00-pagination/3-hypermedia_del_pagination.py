#!/usr/bin/env python3
"""
This module implements a deletion-resilient hypermedia pagination
"""
import csv
import math
from typing import List, Dict


class Server:
    """
    Server class to paginate a database of popular baby names

    Attributes:
        DATA_FILE: a string representing the path to the dataset of baby names
        __dataset: a list representing the baby names dataset
        __indexed_dataset: a dictionary containing the indexed dataset

    Methods:
        dataset: loads the cached dataset
        indexed_dataset: indexes the dataset
        get_hyper_index: retrieves the hypermedia pagination
    """
    DATA_FILE = 'data/Popular_Baby_Names.csv'

    def __init__(self):
        """
        Initializes the Server instance

        Attributes:
            __indexed_dataset: a dictionary containing the indexed dataset
            __dataset: a list representing the baby names dataset
        """
        self.__indexed_dataset = None
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Loads the cached dataset

        Returns:
            a list of lists representing the dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE, 'r') as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """
        Dataset indexed by sorting position, starting at 0

        Returns:
            a dictionary containing the indexed dataset by sorting position
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }

        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Retrieves the hypermedia pagination

        Args:
            index: an integer representing the index of the data to paginate
            page_size: an integer representing the page size

        Returns:
            a dictionary containing the following key-value pairs:
                - index: the current index of the pagination
                - next_index: the next index of the pagination
                - page_size: the current page size
                - data: a list of the dataset at the current index
        """
        dataset_length = len(self.dataset())

        if index is None:
            index = 0
        else:
            assert 0 <= index < dataset_length, "Index out of range"

        next_index = min(index + page_size, dataset_length)

        data = [self.dataset()[i] for i in range(index, next_index)]

        # Adjust next_index if any rows were deleted between index & next_index
        deleted_rows = sum(
            1 for i in range(index, next_index)
            if i not in self.indexed_dataset()
            )
        next_index += deleted_rows

        return {
            "index": index,
            "next_index": next_index,
            "page_size": page_size,
            "data": data
        }
