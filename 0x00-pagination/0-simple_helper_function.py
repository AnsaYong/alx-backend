#!/usr/bin/env python3
"""
This module provides a function that takes two integer arguments
and returns a tuple representing the start and end indexes
which correspond to the range of indexes to return in a list for
those particular pagination parameters.
"""
from typing import Tuple


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
