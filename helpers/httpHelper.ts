interface Options {
	method: string
	headers: any
	body?: any
	signal: AbortSignal
}

const controller = new AbortController()

const optionsDefault = {
	method: "GET",
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
	signal: controller.signal,
}

const httpHelper = () => {
	const customFetch = async (url: string, options: Options = optionsDefault) => {
		options.method = options.method || optionsDefault.method
		options.headers = { ...optionsDefault.headers, ...options.headers }
		options.body = JSON.stringify(options.body) || false
		if (!options.body) delete options.body

		setTimeout(() => {
			controller.abort()
		}, 3000)

		try {
			const response = await fetch(url, options)
			return await response.json()
		} catch (error) {
			console.error(error)
		}
	}

	const get = (url: string) => customFetch(url)

	return {
		get,
	}
}

export default httpHelper
