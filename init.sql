CREATE TABLE Person (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    external_id VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    status ENUM('MORTO', 'VIVO') DEFAULT 'VIVO'
);

CREATE TABLE Insurance (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    duration INT NOT NULL,
    monthly_value DECIMAL(10, 2) NOT NULL,
    insured_value DECIMAL(10, 2) NOT NULL,
    person_id BIGINT,
    FOREIGN KEY (person_id) REFERENCES Person(id)
);

CREATE TABLE HistorySimulation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL DEFAULT 4.00,
    start_date DATE NOT NULL,
    person_id BIGINT,
    FOREIGN KEY (person_id) REFERENCES Person(id)
);

CREATE TABLE Allocation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    type ENUM('FINANCEIRA', 'IMOBILIZADA') NOT NULL,
    person_id BIGINT,
    FOREIGN KEY (person_id) REFERENCES Person(id)
);

CREATE TABLE FinancialAllocation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10, 2) NOT NULL,
    allocation_date DATE NOT NULL,
    allocation_id BIGINT,
    FOREIGN KEY (allocation_id) REFERENCES Allocation(id)
);

CREATE TABLE FixedAssetAllocation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    monthly_value DECIMAL(10, 2) NOT NULL,
    has_financing BOOLEAN NOT NULL,
    installments INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    down_payment DECIMAL(10, 2),
    allocation_id BIGINT,
    FOREIGN KEY (allocation_id) REFERENCES Allocation(id)
);

CREATE TABLE Movement (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('DESPESA', 'RENDA') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    frequency ENUM('UNICA', 'MENSAL', 'ANUAL') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    person_id BIGINT,
    FOREIGN KEY (person_id) REFERENCES Person(id)
);

CREATE TABLE MovementTransaction (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    transaction_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    movement_id BIGINT,
    FOREIGN KEY (movement_id) REFERENCES Movement(id) ON DELETE CASCADE
);