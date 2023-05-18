import React, { useEffect, useState } from 'react';

function CadastroDeVantagens() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [foto, setFoto] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('preco', preco);
    formData.append('foto', foto);

    try {
      const response = await fetch('http://localhost:3000/api/vantagem', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Vantagem cadastrada com sucesso:', data);
      } else {
        console.error('Erro ao cadastrar vantagem:', response.statusText);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data"> 
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="descricao">Descrição:</label>
        <input
          type="text"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="preco">Preço:</label>
        <input
          type="text"
          id="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="foto">Foto:</label>
        <input
            type="file"
            id="foto"
            name="foto"
            onChange={(e) => setFoto(e.target.files[0])}
        />
        <img src="http://localhost:3000/files/foto_1684449913651_download.jfif" alt="" />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default CadastroDeVantagens;
