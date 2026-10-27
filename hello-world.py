import random
import math

desired_result = "hello world"
result = []

def randomize_letters(desired_result):
    randomized_word = random.sample(desired_result, len(desired_result))
    return randomized_word

letters = (randomize_letters(desired_result))
print(letters)

# Detect the case and then calculate the chances of the randomized letters being the same as the desired result (not exact but roughly)
if desired_result == "".join(letters):
    odds = math.factorial(len(desired_result))
    print(f"The chance of this happening is roughly 1 in {odds:,}!")

for desired_char in desired_result:
    if desired_char == " ":
        result.append(" ")
        print(result)

    elif desired_char in letters:
        result.append(desired_char)
        letters.remove(desired_char)

    else:
        raise ValueError(f"Missing letter: {desired_char}")
    print(result)

print("".join(result))