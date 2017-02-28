import axios from 'axios'
import {AxiosInstance} from 'axios'

class ManagementApi {
  private client : AxiosInstance
  private space : string

  previewApi : any

  constructor (space : string, accessToken : string) {
    this.space = space
    this.previewApi = null
    this.client = axios.create({
      baseURL: `https://api.contentful.com`,
      headers: {
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  }

  get(url : string, params? : Object) {
    return this.client.get(url, { params }).then(result => result.data)
  }

  put(url : string, body : any, version : string) {
    return this.client.put(url, body, {
      headers: {
        'X-Contentful-Version': version,
      }
    }).then(result => result.data)
  }

  getEntry(id : string) {
    return this._getEntity(id, 'entries')
  }

  getAsset(id : string) {
    return this._getEntity(id, 'assets')
  }

  _getEntity(id : string, entityPath : string) {
    return this.get(`/spaces/${this.space}/${entityPath}/${id}`)
  }

  async saveEntry(entry : any) {
    return this._save(entry, 'entries')
  }

  async saveAsset(asset : any) {
    return this._save(asset, 'assets')
  }

  async _save(entity : any, entityPath : string) {
    const { fields, sys: { id, version } } = entity
    const newEntry = await this.put(`/spaces/${this.space}/${entityPath}/${id}`, { fields }, version)

    if (this.previewApi) {
      this.previewApi.override(this.formatForDelivery(newEntry))
    }

    return newEntry
  }

  async getTypeMeta(type : string) {
    const [
      contentType,
      editorInterface,
    ] = await Promise.all([
      this.get(`/spaces/${this.space}/content_types/${type}`),
      this.get(`/spaces/${this.space}/content_types/${type}/editor_interface`),
    ])

    contentType.fields.forEach((field : any) => {
      field.control = editorInterface.controls.find((editor : any) => editor.fieldId === field.id)
    })
    return contentType
  }

  async getPreviewToken() {
    const previewApiKeys = await this.get(`/spaces/${this.space}/preview_api_keys`)
    const apiKey = previewApiKeys.items[0]
    return apiKey && apiKey.accessToken
  }

  getUser() {
    return this.get('/user')
  }

  getSpace() {
    return this.get(`/spaces/${this.space}`)
  }

  formatForDelivery(entry : any) {
    Object.keys(entry.fields).forEach(name => {
      const value = entry.fields[name]
      entry.fields[name] = value && value['en-US']
    })
    return entry
  }
}

export default ManagementApi
