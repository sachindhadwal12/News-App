package com.oshada.repository;

import com.oshada.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 * This class is implementing the JpaRepository interface for User.
 * @Repository marks the specific class as a Data Access Object
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {

    public User findByEmailAndPassword(String id, String password);

}
