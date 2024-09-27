async function radixSort() {
    let max = getMax(arr, size); // Get the maximum element to determine the number of digits
    let exp = 1; // Exponent corresponding to the current digit position

    // Loop through each digit (exponentially growing: 1's, 10's, 100's, etc.)
    while (Math.floor(max / exp) > 0) {
        await countSortByDigit(exp); // Sort the array by the current digit position
        exp *= 10; // Move to the next digit position
    }

    // Mark all elements as sorted
    for (let i = 0; i < size; i++) {
        setColor(i, SORTED);
        await sleep(delay);
    }
}

// Helper function to get the maximum value in the array
function getMax(arr, n) {
    let mx = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] > mx)
            mx = arr[i];
    }
    return mx;
}

// Count sort function that sorts based on a specific digit
async function countSortByDigit(exp) {
    let output = new Array(size); // Output array to store the sorted array
    let count = new Array(10).fill(0); // Count array for digits (0-9)

    // Count the number of occurrences of each digit at the current place value
    for (let i = 0; i < size; i++) {
        let digit = Math.floor(arr[i] / exp) % 10;
        setColor(i, COMPARE);
        await sleep(delay);
        count[digit]++;
        setColor(i, UNSORTED);
    }

    // Update the count array to hold the actual positions of digits
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array by placing elements at their correct positions
    for (let i = size - 1; i >= 0; i--) {
        let digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Copy the output array back into the original array
    for (let i = 0; i < size; i++) {
        arr[i] = output[i];
        setHeight(i, arr[i] + 'px'); // Update the height in the DOM
        setColor(i, SELECTED);
        await sleep(delay);
        setColor(i, UNSORTED);
    }
}
