void Item::SpawnDeferred(const std::function<void(ItemEntity&)>;& OnSpawned, const QuatT& transform) {
	ExecuteDeferred([this, OnSpawned, transform]() {
		auto* spawnedItem = entitySystem->SpawnUnsafeItem(transform);
		if (spawnedItem) {
			OnSpawned(*spawnedItem);
		}
	});
}
//=========================================================================
Deferrable::~Deferrable() {
	GetDeferredSystem().CancelAllDeferred(*this);
}

//=========================================================================
template <class Fn>
bool Deferrable::ExecuteDeferred(Fn&& fn) const {
	const auto ret = GetDeferredSystem().ExecuteDeferred(std::forward<Fn>(fn), *this);
	return ret;
}