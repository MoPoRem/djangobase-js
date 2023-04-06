class ApiClient {

    constructor(baseURL, token) {
    this.baseURL = baseURL
    this.resourceURL = null
    this.headers = {
      Authorization: `Token ${token}`,
    }
  }

  _fetch(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...this.headers,
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
  }
  
  from (modelName){
    if(modelName.includes('.')){
      const[folder, model] = modelName.split('.')
      this.resourceURL = `${this.baseURL}/${folder}/${model}/`
    }else {
      this.resourceURL = `${this.baseURL}/${folder}/`
    }
    return this
  }
  
  call(name, data) {
	  return this._fetch(`${this.baseURL}/functions/${name}/`, 
		{ 
			method: "POST", 
			body: JSON.stringify({params: data})
		})
  }

  all() {
    return this._fetch(this.resourceURL)
  }

  filter(params) {
    const url = new URL(this.resourceURL)
    Object.entries(params).forEach(([key, val]) => url.searchParams.append(key, val))
    return this._fetch(url)
  }

  create(data) {
    return this._fetch(this.resourceURL, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
  }

  get(pk) {
    const url = `${this.resourceURL}${pk}/`
    return this._fetch(url)
  }

  update(pk, data) {
    const url = `${this.resourceURL}${pk}/`
    return this._fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    })
  }

  patch(pk, data) {
    const url = `${this.resourceURL}${pk}/`
    return this._fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    })
  }

  delete(pk) {
    const url = `${this.resourceURL}${pk}/`
    return this._fetch(url, {
      method: 'DELETE',
      headers: this.headers,
    })
  }

}

module.exports = ApiClient;