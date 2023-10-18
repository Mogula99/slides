CameraTexture::~CameraTexture() {
	if (_texture.is_valid()) {
		RenderingServer::get_singleton()->free(_texture);
	}
}

void TextureStorage::texture_free(RID p_texture) {
	Texture *t = texture_owner.get_or_null(p_texture);
	t->cleanup();
	...
	texture_owner.free(p_texture);
}

void PoolAllocator::free(ID p_mem) {
	mt_lock();
	Entry *e = get_entry(p_mem);
	bool index_found = find_entry_index(&entry_indices_pos, e);
	...
	entry_count--;
	free_mem += aligned(e->len);
	e->clear();
	mt_unlock();
}