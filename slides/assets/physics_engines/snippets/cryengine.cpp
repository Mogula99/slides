if (min(min(min(body.M,ibody_inv.x),ibody_inv.y),ibody_inv.z)<0) {
	body.M = body.Minv = 0;
	body.Ibody_inv.zero(); body.Ibody.zero();
}	else {
	body.P = (body.v=v)*body.M; 
	body.L = body.q*(body.Ibody*(!body.q*(body.w=w)));
}