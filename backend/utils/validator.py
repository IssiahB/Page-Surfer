import re

valid_email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

def validate_email(email: str) -> bool:
    if (re.fullmatch(valid_email_regex, email)):
        return True
    return False

max_length = 20
min_length = 3
disallowed_characters = ['<', '>', '%', '^', '@', '$',
                         '!', '~', '`', '?', '.', ',',
                         '\'', '"', ';', ':', '[', ']',
                         '{', '}', '\\', '/', '+', '=',
                         ')', '(', '*', '&', '|', '#']

def validate_username(username: str) -> bool:
    length = len(username)
    if disallowed_characters in username:
        return False
    if length > max_length or length < min_length:
        return False
    return True