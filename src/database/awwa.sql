-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Mag 15, 2020 alle 13:06
-- Versione del server: 10.3.22-MariaDB-0+deb10u1
-- Versione PHP: 7.3.14-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Struttura della tabella `commenti`
--

CREATE TABLE `commenti` (
  `id` int(11) NOT NULL,
  `id_utente` varchar(50) NOT NULL,
  `id_post` int(11) NOT NULL,
  `testo` varchar(5000) NOT NULL,
  `data` timestamp(5) NOT NULL DEFAULT current_timestamp(5)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `commenti`
--

INSERT INTO `commenti` (`id`, `id_utente`, `id_post`, `testo`, `data`) VALUES
(1, 'g.latrofa3@studenti.poliba.it', 4, 'bello', '2020-05-09 10:17:13.00000'),
(2, 'g.latrofa3@studenti.poliba.it', 5, 'non mi piace', '2020-05-09 10:21:36.00000'),
(10, 'g.latrofa3@studenti.poliba.it', 8, 'vito scemo', '2020-05-10 15:23:15.31062'),
(9, 'g.latrofa3@studenti.poliba.it', 9, 'vito scemo', '2020-05-10 15:23:15.30364'),
(8, 'g.latrofa3@studenti.poliba.it', 9, 'test', '2020-05-10 15:22:01.39729');

-- --------------------------------------------------------

--
-- Struttura della tabella `messaggi`
--

CREATE TABLE `messaggi` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `oggetto` varchar(50) NOT NULL,
  `messaggio` varchar(8000) NOT NULL,
  `data` timestamp(5) NOT NULL DEFAULT current_timestamp(5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `data` timestamp(5) NOT NULL DEFAULT current_timestamp(5),
  `titolo` varchar(30) NOT NULL,
  `testo` varchar(5000) NOT NULL,
  `id_serie` varchar(8) NOT NULL,
  `numero_stagione` varchar(2) NOT NULL,
  `numero_episodio` varchar(2) NOT NULL,
  `piace` int(11) NOT NULL DEFAULT 0,
  `dislike` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `post`
--

INSERT INTO `post` (`id`, `email`, `data`, `titolo`, `testo`, `id_serie`, `numero_stagione`, `numero_episodio`, `piace`, `dislike`) VALUES
(5, 'g.latrofa3@studenti.poliba.it', '2020-05-08 17:36:52.39811', 'titolo', 'testo', '18347', '5', '13', 7, 9),
(4, 'g.latrofa3@studenti.poliba.it', '2020-05-08 17:34:20.78757', 'falena titolo', 'bla bla bla', '4607', '1', '7', 13, 7),
(6, 'g.latrofa3@studenti.poliba.it', '2020-05-09 12:45:59.87789', 'covid', 'covid 19', '75758', '1', '6', 13, 6),
(7, 'g.latrofa3@studenti.poliba.it', '2020-05-09 12:49:00.09076', 'ale toglie sempre il login', 'alessandro non deve togliere il login', '63054', '1', '2', 16, 17),
(8, 'g.latrofa3@studenti.poliba.it', '2020-05-10 09:45:33.60735', 'Stagione 4', 'Non vedo l\'ora che esca la quarta stagione!', '60625', '3', '10', 2, 1),
(9, 'g.latrofa3@studenti.poliba.it', '2020-05-10 09:52:27.15041', 'Wow che serie', 'Davvero una bellissima serie, peccato che si debba cerca una spiegazione del finale. È davvero criptico!', '4607', '5', '17', 6, 1),
(10, 'g.latrofa3@studenti.poliba.it', '2020-05-14 13:13:40.37589', 'D&D', 'Ma quanto sono divertenti questi episodi su D&D?', '18347', '5', '10', 0, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `segnalazioni`
--

CREATE TABLE `segnalazioni` (
  `id` int(11) NOT NULL,
  `idPost` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `data` timestamp(5) NOT NULL DEFAULT current_timestamp(5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `segnalazioni`
--

INSERT INTO `segnalazioni` (`id`, `idPost`, `email`, `data`) VALUES
(1, 7, '', '2020-05-10 09:17:53.67588'),
(2, 6, '', '2020-05-10 09:18:06.20523'),
(3, 7, '', '2020-05-10 09:20:42.41639'),
(4, 4, '', '2020-05-10 09:22:04.51246'),
(5, 6, '', '2020-05-10 09:22:10.94631'),
(6, 7, '', '2020-05-10 09:22:14.14685'),
(7, 7, '', '2020-05-10 09:23:30.84431'),
(8, 7, '', '2020-05-10 09:35:10.82342'),
(9, 4, '', '2020-05-10 09:35:13.70879'),
(10, 5, '', '2020-05-10 09:35:15.71571'),
(11, 5, '', '2020-05-10 09:35:18.46122'),
(12, 7, '', '2020-05-10 09:44:50.29973');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `data_nascita` varchar(10) NOT NULL,
  `nazione` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nome_utente` varchar(15) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`nome`, `cognome`, `data_nascita`, `nazione`, `email`, `nome_utente`, `password`) VALUES
('Giuseppe', 'Latrofa', '1999-01-28', 'Italy', 'g.latrofa3@studenti.poliba.it', 'peppone', '014635095eeeda4945a6c17d0cfb6abb'),
('SEVERUS', 'SNAPE', '1960-01-01', 'United Kingdom of Great Britain and Northern Ireland (the)', 'severussnape1@gmail.com', 'sevsnape1', 'a7d0eeb054b7cd7ccbf3041bc441c522');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `commenti`
--
ALTER TABLE `commenti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utente` (`id_utente`),
  ADD KEY `id_post` (`id_post`);

--
-- Indici per le tabelle `messaggi`
--
ALTER TABLE `messaggi`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indici per le tabelle `segnalazioni`
--
ALTER TABLE `segnalazioni`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`),
  ADD KEY `idPost` (`idPost`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `nome_utente` (`nome_utente`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `commenti`
--
ALTER TABLE `commenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT per la tabella `messaggi`
--
ALTER TABLE `messaggi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT per la tabella `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT per la tabella `segnalazioni`
--
ALTER TABLE `segnalazioni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
