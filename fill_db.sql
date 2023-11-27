create table if not exists carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status my_enum
);

create table if not exists cart_items (
	product_id uuid not null default uuid_generate_v4() primary key,
	count int not null
);

alter table cart_items add column cart_id uuid references carts(id);

create extension if not exists "uuid-ossp";

insert into carts values
('8012d546-8e4d-46b8-8587-0018c0a2fff9', 'df59c429-d8fc-4996-8771-d30af74c2e82', '2023-11-22', '2023-11-22', 'OPEN'),
('02e5796a-3b6b-461f-b8db-a74d8c0e56f4', 'df59c429-d8fc-4996-8771-d30af74c2e82', '2023-11-22', '2023-11-22', 'OPEN');

insert into cart_items values
('ed298b62-52d9-413c-b288-55ceecbb94a3', 3, '8012d546-8e4d-46b8-8587-0018c0a2fff9'),
('391baf8a-4722-4873-98f5-0f1e3f4e0b50', 1, '02e5796a-3b6b-461f-b8db-a74d8c0e56f4');
