package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.blog.BlogEntity;
import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerReadBlogsTest {
  
  @Autowired
  private UserController controller;

  @SuppressWarnings("unchecked")
  @Test
  public void findBlogsOk() {

    Resources<Resource<BlogEntity>> result = (Resources<Resource<BlogEntity>>) controller
        .readBlogs("00000004-0000-0000-0004-000000000000", null).getBody();

    assertThat(result.getContent()).allMatch(resource -> 
        resource.getContent().getAuthor() != null 
        && !resource.getContent().getAuthor().isEmpty());
  }

  @Test(expected = NotFoundException.class)
  public void findBlogsNotFound() {

    Resources<?> result = (Resources<?>) controller
        .readBlogs("00000004-0000-0000-00XX-000000000000", null).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

}
