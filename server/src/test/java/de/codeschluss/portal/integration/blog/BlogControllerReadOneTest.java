package de.codeschluss.portal.integration.blog;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.blog.BlogController;
import de.codeschluss.portal.components.blog.BlogEntity;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BlogControllerReadOneTest {

  @Autowired
  private BlogController controller;

  @Test
  public void findOneOk() {
    String blogId = "00000000-0000-0000-0016-100000000000";

    Resource<BlogEntity> result = (Resource<BlogEntity>) controller.readOne(blogId);

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findBlogNotFound() {
    String blogId = "00000000-0000-0000-0016-XX0000000000";

    controller.readOne(blogId);
  }
}
