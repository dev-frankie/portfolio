/**
 * bubble sort
 * 
 * 인접한 두 요소를 비교해 순서가 틀리면 교환하는 방식으로 배열 끝까지 반복하는 간단한 정렬 방법
 * 
 */

let array = [5, 3, 8, 8, 4, 2];

function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

console.log(bubbleSort(array));


/**
 * 
 * 선택정렬 (Selection sort)
 * 
 * 배열에서 최솟값을 찾아 맨 앞요소와 교환하는 방식을 반복하여 정렬하는 알고리즘
 * 
 */

function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        }
    }
    return arr
}

console.log(selectionSort(array))

/**
 * 
 * 삽입정렬(Insertion sort)
 * 
 * 정렬된 부분과 정렬되지 않은 부분으로 나누어 정렬되지 않은 부분의 각 요소를 올바른 위치에 삽입
 * 
 */


// let array = [3,4, 5, 8, 8, 2];

function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

console.log(insertionSort(array))

/**
 * 
 * 병합정렬(Merge Sort)
 * 
 * 분할정복(divide and conquer) 알고리즘의 대표적인 예로, 배열을 반으로 나누어 정렬한 후 병합하는 방식입니다.
 * 
 */

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.left) {
        if (left[i] < right[j]) {
            result.push(left[i++])
        } else {
            result.push(right[j++])
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));

}

function mergeSort(arr) {
    if (arr.length <= 1)
        return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))
    return merge(left, right);

}

console.log(mergeSort(array));

/**
 * 
 * 퀵 정렬(quick sort)
 * 
 * 분할 정복 알고리즘으로 기준(pivot)을 선택하여 배열을 분할한 후 각가을 재귀적으로 정렬하는 방식
 * 
 */

function quickSort(arr) {

    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];

    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)]
}

console.log(quickSort(array));


function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1
        } else {
            right = mid - 1;
        }
    }
}

console.log('binarySearch>> ', binarySearch([1, 2, 3, 4, 5, 6, 7], 4)); // 3


function fibonacci(n) {
    if (n < 0)
        return null;
    if (n === 0)
        return 0;
    if (n === 1)
        return 1;

    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }

    return curr;
}

// console.log('fibonacci', fibonacci(6)); // 8 (0,1,1,2,3,5,8)


function dijkstra(graph, start) {
    // graph는 각 정점이 인접 정점과 가중치를 가진 객체 형태입니다.
    // 예: { A: { B: 5, C: 2 }, B: { A: 5, C: 4, D: 3 }, C: { A: 2, B: 4, D: 6 }, D: { B: 3, C: 6 } }

    const distances = {};  // 시작점에서 각 정점까지의 최소 거리
    const visited = {};

    // 초기화: 모든 정점의 거리를 Infinity로 설정하고, 시작점은 0
    for (let vertex in graph) {
        console.log('vertex ', vertex)
        distances[vertex] = Infinity;
        visited[vertex] = false;
    }
    distances[start] = 0;

    console.log('graph', graph);
    console.log('distances', distances);
    console.log('visited', visited);

    while (true) {
        // 아직 방문하지 않은 정점 중 가장 거리가 짧은 정점 선택
        let nearestVertex = null;
        let minDistance = Infinity;
        for (let vertex in graph) {
            if (!visited[vertex] && distances[vertex] < minDistance) {
                minDistance = distances[vertex];
                nearestVertex = vertex;
            }
        }

        // 모든 정점을 방문했거나, 연결되지 않은 경우 종료
        if (nearestVertex === null) break;

        visited[nearestVertex] = true;

        // 인접 정점들의 거리를 갱신
        for (let neighbor in graph[nearestVertex]) {
            const newDistance = distances[nearestVertex] + graph[nearestVertex][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
            }
        }
    }

    return distances;
}

// 테스트 예시
const graph = {
    A: { B: 5, C: 2 },
    B: { A: 5, C: 4, D: 3 },
    C: { A: 2, B: 4, D: 6 },
    D: { B: 3, C: 6 }
};

console.log(dijkstra(graph, "A"));