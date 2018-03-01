SET character_set_client = utf8;

INSERT INTO `tags` (`id`, `name`, `description`) VALUES
('00000000-0000-0000-0002-100000000000', 'tag1', 'tag1'),
('00000000-0000-0000-0002-200000000000', 'tag2', 'tag2');

INSERT INTO `target_groups` (`id`, `name`, `description`) VALUES
('00000000-0000-0000-0003-100000000000', 'target1', 'target1'),
('00000000-0000-0000-0003-200000000000', 'target2', 'target2');

INSERT INTO `users` (`id`, `superuser`, `username`, `password`, `fullname`, `phone`) VALUES
('00000000-0000-0000-0004-100000000000', 1, 'super@user', '$2y$10$VVFNql01lVC3k/B0a2L5XOh0DYIVkF1SPBL6rQxvM8h9GWLcsI0J2', 'superuser', '01234567890'),
('00000000-0000-0000-0004-200000000000', 0, 'admin@user', '$2y$10$VVFNql01lVC3k/B0a2L5XOh0DYIVkF1SPBL6rQxvM8h9GWLcsI0J2', 'adminuser', '09876543210'),
('00000000-0000-0000-0004-300000000000', 0, 'provider1@user', '$2y$10$VVFNql01lVC3k/B0a2L5XOh0DYIVkF1SPBL6rQxvM8h9GWLcsI0J2', 'provider1user', '09876543210'),
('00000000-0000-0000-0004-400000000000', 0, 'provider2@user', '$2y$10$VVFNql01lVC3k/B0a2L5XOh0DYIVkF1SPBL6rQxvM8h9GWLcsI0J2', 'provider2user', '09876543210'),
('00000000-0000-0000-0004-500000000000', 0, 'new@user', '$2y$10$VVFNql01lVC3k/B0a2L5XOh0DYIVkF1SPBL6rQxvM8h9GWLcsI0J2', 'newuser', '09876543210'),
('00000000-0000-0000-0004-600000000000', 0, 'todelete@user', '$2y$10$VVFNql01lVC3k/B0a2L5XOh0DYIVkF1SPBL6rQxvM8h9GWLcsI0J2', 'deleteuser', '09876543210'),
('00000000-0000-0000-0004-700000000000', 0, 'owndelete@user', '$2y$10$VVFNql01lVC3k/B0a2L5XOh0DYIVkF1SPBL6rQxvM8h9GWLcsI0J2', 'deleteuser', '09876543210'),
('00000000-0000-0000-0004-800000000000', 0, 'provider3@user', '$2y$10$VVFNql01lVC3k/B0a2L5XOh0DYIVkF1SPBL6rQxvM8h9GWLcsI0J2', 'provider3user', '09876543210');

INSERT INTO `suburbs` (`id`, `name`) VALUES
('00000000-0000-0000-0005-100000000000', 'suburb1'),
('00000000-0000-0000-0005-200000000000', 'suburb2'),
('00000000-0000-0000-0005-300000000000', 'todelete');

INSERT INTO `addresses` (`id`, `longitude`, `latitude`, `street`, `house_number`, `postal_code`, `place`, `suburb_id`) VALUES
('00000000-0000-0000-0006-100000000000', 7.14733123779296900000, 51.25588989257812500000, 'address1', '1', '42103', 'wuppertal', '00000000-0000-0000-0005-100000000000'),
('00000000-0000-0000-0006-200000000000', 7.2, 51.25505828857422000000, 'address2', '2', '42103', 'wuppertal', '00000000-0000-0000-0005-200000000000');

INSERT INTO `categories` (`id`, `name`, `description`, `color`) VALUES
('00000000-0000-0000-0007-100000000000', 'category1', 'category1', 'green'),
('00000000-0000-0000-0007-200000000000', 'category2', 'category2', 'yellow');

INSERT INTO `organisations` (`id`, `name`, `description`, `website`, `mail`, `phone`, `image`, `address_id`) VALUES
('00000000-0000-0000-0008-100000000000', 'organisation1', 'organisation1', 'www.orga1.de', 'organisation@1.de', '01234567890', null, '00000000-0000-0000-0006-100000000000'),
('00000000-0000-0000-0008-200000000000', 'organisation2', 'organisation2', 'www.organisation2.com', 'organisation@2.com', '09876543210', null, '00000000-0000-0000-0006-100000000000'),
('00000000-0000-0000-0008-300000000000', 'organisation3', 'organisation3', 'www.organisation3.com', 'organisation@3.com', '09876543210', null, '00000000-0000-0000-0006-200000000000');

INSERT INTO `providers` (`id`, `organisation_id`, `user_id`, `admin`, `approved`) VALUES
('00000000-0000-0000-0009-100000000000', '00000000-0000-0000-0008-100000000000', '00000000-0000-0000-0004-200000000000', 1, 1),
('00000000-0000-0000-0009-200000000000', '00000000-0000-0000-0008-100000000000', '00000000-0000-0000-0004-300000000000', 0, 1),
('00000000-0000-0000-0009-300000000000', '00000000-0000-0000-0008-200000000000', '00000000-0000-0000-0004-400000000000', 0, 1),
('00000000-0000-0000-0009-400000000000', '00000000-0000-0000-0008-300000000000', '00000000-0000-0000-0004-500000000000', 0, 0),
('00000000-0000-0000-0009-500000000000', '00000000-0000-0000-0008-100000000000', '00000000-0000-0000-0004-800000000000', 0, 1),
('00000000-0000-0000-0009-600000000000', '00000000-0000-0000-0008-200000000000', '00000000-0000-0000-0004-400000000000', 0, 1),
('00000000-0000-0000-0009-700000000000', '00000000-0000-0000-0008-100000000000', '00000000-0000-0000-0004-800000000000', 0, 1),
('00000000-0000-0000-0009-800000000000', '00000000-0000-0000-0008-300000000000', '00000000-0000-0000-0004-800000000000', 0, 1);

INSERT INTO `activities` (`id`, `name`, `description`, `show_user`, `address_id`, `provider_id`, `category_id`) VALUES
('00000000-0000-0000-0010-100000000000', 'activity1', 'activity1', 1, '00000000-0000-0000-0006-100000000000', '00000000-0000-0000-0009-100000000000', '00000000-0000-0000-0007-100000000000'),
('00000000-0000-0000-0010-200000000000', 'activity2', 'activity2', 0, '00000000-0000-0000-0006-100000000000', '00000000-0000-0000-0009-200000000000', '00000000-0000-0000-0007-100000000000'),
('00000000-0000-0000-0010-300000000000', 'activity3', 'activity3', 1, '00000000-0000-0000-0006-200000000000', '00000000-0000-0000-0009-300000000000', '00000000-0000-0000-0007-200000000000');

INSERT INTO `schedules` (`id`, `start_date`, `end_date`, `activity_id`) VALUES
('00000000-0000-0000-0011-100000000000', '2018-04-19 13:00:00', '2018-04-19 15:00:00', '00000000-0000-0000-0010-100000000000'),
('00000000-0000-0000-0011-200000000000', '2018-04-20 13:00:00', '2018-04-20 15:00:00', '00000000-0000-0000-0010-200000000000'),
('00000000-0000-0000-0011-300000000000', '2018-04-21 13:00:00', '2018-04-21 15:00:00', '00000000-0000-0000-0010-300000000000'),
('00000000-0000-0000-0011-400000000000', '2018-04-21 14:00:00', '2018-04-22 16:00:00', '00000000-0000-0000-0010-300000000000'),
('00000000-0000-0000-0011-500000000000', '2018-04-21 14:00:00', '2018-04-22 16:00:00', '00000000-0000-0000-0010-300000000000');