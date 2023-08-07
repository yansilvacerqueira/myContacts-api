CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table categories (
	id UUID not null unique default uuid_generate_v4(),
	name VARCHAR not null
)

create table contacts (
	id UUID not null unique default uuid_generate_v4(),
	name VARCHAR not null,
	email VARCHAR unique,
	phone VARCHAR,
	category_id UUID,
	foreign key(category_id)references categories(id)
)