import {post, put, del, get} from "@/utils/request";

const oneDriver = {
  getAppRoot: () => get('/oD/drive/root/children'),
  downLoadItem: id => get(`/oD/drive/items/${id}/content`, {}, {
    responseType: 'arraybuffer'
  }),
  getItemInfo: id => get(`/oD/drive/items/${id}`),
  getItemChild: id => get(`/oD/drive/items/${id}/children`),
	insertItem: (parentId, name, data) => put(`/oD/me/drive/items/${parentId}:/${name}:/content`, data)
}

export default oneDriver
