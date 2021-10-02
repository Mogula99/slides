class InputEvent : public Resource {

public:
	static const int DEVICE_ID_TOUCH_MOUSE;
	void set_device(int p_device);
	int get_device() const;

	bool is_action(const StringName &p_action, bool p_exact_match = false) const;
	bool is_action_pressed(const StringName &p_action, bool p_allow_echo = false, bool p_exact_match) const;
	bool is_action_released(const StringName &p_action, bool p_exact_match = false) const;
	float get_action_strength(const StringName &p_action, bool p_exact_match = false) const;
	float get_action_raw_strength(const StringName &p_action, bool p_exact_match = false) const;
	virtual bool is_pressed() const;

	virtual bool is_match(const Ref<InputEvent> &p_event, bool p_exact_match = true) const;

	virtual bool accumulate(const Ref<InputEvent> &p_event) { return false; }
};