package com.revature.models;

import lombok.*;

import javax.persistence.*;
@Entity(name = "users")
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
//@Getter
//@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    private String username;
    private String password;
}