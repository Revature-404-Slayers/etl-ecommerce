package com.revature.models;

import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Objects;

@Component
@Entity
@Table(name="payment_table")
@NoArgsConstructor
@AllArgsConstructor
//@Getter
//@Setter
@Data
public class PaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_txn_id")
    private Integer paymentTxnId;

    @Column(name = "failure_reason")
    private String failureReason;

    @Column(name = "payment_type")
    private String paymentType;

    @Column(name = "payment_txn_success")
    private String paymentTxnSuccess;

    @Column(name = "product_name")
    private String productName;


    @Override
    public String toString() {
        return "PaymentEntity{" +
                "paymentTxnId=" + paymentTxnId +
                ", failureReason='" + failureReason + '\'' +
                ", paymentType='" + paymentType + '\'' +
                ", paymentTxnSuccess='" + paymentTxnSuccess + '\'' +
                ", productName='" + productName + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaymentEntity that = (PaymentEntity) o;
        return Objects.equals(paymentTxnId, that.paymentTxnId) && Objects.equals(failureReason, that.failureReason) && Objects.equals(paymentType, that.paymentType) && Objects.equals(paymentTxnSuccess, that.paymentTxnSuccess) && Objects.equals(productName, that.productName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(paymentTxnId, failureReason, paymentType, paymentTxnSuccess, productName);
    }
}






