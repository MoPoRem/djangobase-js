class ApiClient {

    constructor(baseURL, token) {
    this.baseURL = baseURL
    this.resourceURL = null
    this.headers = {
      Authorization: `Token ${token}`,
    }
    this.pk = null
  }

  _fetch(url, options = {}, pk=undefined) {
    url = this._constructUrlFromPk(url, pk)
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...this.headers,
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
  }

  _constructUrlFromPk(url, pk) {
    if (pk) {
      return `${url}${pk}`
    }
    return url
  }
  
  from (modelName){
    if(modelName.includes('.')){
      const[folder, model] = modelName.split('.')
      this.resourceURL = `${this.baseURL}/${folder}/${model}/`
    }else {
      this.resourceURL = `${this.baseURL}/models/${modelName}/`
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
    return this._fetch(this.resourceURL, {}, pk)
  }

  update(data, pk) {
    return this._fetch(this.resourceURL, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    }, pk)
  }

  patch(data, pk) {
    const url = `${this.resourceURL}${pk}/`
    return this._fetch(this.resourceURL, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    }, pk)
  }

  delete(pk) {
    const url = `${this.resourceURL}${pk}/`
    return this._fetch(this.resourceURL, {
      method: 'DELETE',
      headers: this.headers,
    }, pk)
  }

}

module.exports = ApiClient;