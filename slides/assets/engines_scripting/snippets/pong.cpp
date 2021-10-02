func _process(delta):
    # Get ball position and pad rectangles
    var ball_pos = get_node("ball").get_pos()
    var left_rect = Rect2(get_node("left").get_pos() - pad_size*0.5, pad_size)
    var right_rect = Rect2(get_node("right").get_pos() - pad_size*0.5, pad_size)
    
    # Integrate new ball position
    ball_pos += direction*ball_speed*delta
    
    # Flip, change direction and increase speed when touching pads
    if ((left_rect.has_point(ball_pos) and direction.x < 0) 
    or (right_rect.has_point(ball_pos) and direction.x > 0)):
        direction.x = -direction.x
        ball_speed *= 1.1
        direction.y = randf()*2.0 - 1
        direction = direction.normalized()
    ...