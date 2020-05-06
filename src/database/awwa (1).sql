-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 06, 2020 alle 16:28
-- Versione del server: 5.7.17
-- Versione PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `awwa`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `commento`
--

CREATE TABLE `commento` (
  `id` int(11) NOT NULL,
  `id_utente` varchar(50) NOT NULL,
  `id_post` int(11) NOT NULL,
  `testo` varchar(2000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data` varchar(20) NOT NULL,
  `titolo` varchar(20) NOT NULL,
  `testo` varchar(5000) NOT NULL,
  `id_commento` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `puntate`
--

CREATE TABLE `puntate` (
  `titolo` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `num_puntata` int(11) NOT NULL,
  `durata` varchar(10) NOT NULL,
  `id_stagione` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `puntate`
--

INSERT INTO `puntate` (`titolo`, `id`, `num_puntata`, `durata`, `id_stagione`) VALUES
('micheal', 1, 1, '45 min', 1),
('peppe', 2, 1, '40 min', 2),
('pippen', 3, 2, '45 min', 1),
('galera', 4, 2, '45 min', 2),
('rinascita', 5, 1, '40 min', 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `serietv`
--

CREATE TABLE `serietv` (
  `titolo` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `n_stagioni` int(11) NOT NULL,
  `autore` varchar(30) NOT NULL,
  `nazione` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `serietv`
--

INSERT INTO `serietv` (`titolo`, `id`, `id_post`, `n_stagioni`, `autore`, `nazione`) VALUES
('Prison Break', 1, 0, 5, 'Vtuc', 'Boh'),
('The Last Dance', 2, 0, 1, 'Micheal Jordan', 'USA');

-- --------------------------------------------------------

--
-- Struttura della tabella `stagioni`
--

CREATE TABLE `stagioni` (
  `id` int(11) NOT NULL,
  `id_serie` int(11) NOT NULL,
  `titolo` varchar(40) NOT NULL,
  `n_episodi` int(11) NOT NULL,
  `n_stagione` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `stagioni`
--

INSERT INTO `stagioni` (`id`, `id_serie`, `titolo`, `n_episodi`, `n_stagione`) VALUES
(1, 0, 'Micheal GOAT', 10, 1),
(2, 0, 'Prison Break', 22, 1),
(3, 1, 'Prison 2', 22, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `data_nascita` varchar(10) NOT NULL,
  `paese` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nome_utente` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`nome`, `cognome`, `data_nascita`, `paese`, `email`, `password`, `nome_utente`) VALUES
('', '', '', '', '', '', ''),
('vito', 'difonzo', '04/04/1998', 'italia', 'ciao@gmail.com', 'Ciao.98', '');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `commento`
--
ALTER TABLE `commento`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `puntate`
--
ALTER TABLE `puntate`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `serietv`
--
ALTER TABLE `serietv`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `stagioni`
--
ALTER TABLE `stagioni`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `commento`
--
ALTER TABLE `commento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT per la tabella `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT per la tabella `puntate`
--
ALTER TABLE `puntate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT per la tabella `serietv`
--
ALTER TABLE `serietv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT per la tabella `stagioni`
--
ALTER TABLE `stagioni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
