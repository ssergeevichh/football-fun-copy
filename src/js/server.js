const data = [
    10,
    40,
    20,
    8,
]

export function sendResult(index) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.4) 
                return reject(new Error('Something went wrong'))

            if (index > data.length - 1) 
                return reject(new Error('Something  Index'))

            data[index]++
            const response = data.map((data, index) => {
                return {
                    index,
                    value: data,
                }
            })

            resolve(response)
        }, 2000)
    })
}